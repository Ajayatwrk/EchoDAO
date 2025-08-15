// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title CoreFundDemo
 * @dev Minimal contract for demonstrating funding of a selected project.
 *      Designed for CoreDAO (EVM-compatible) and MVP video demo purposes.
 */
contract CoreFundDemo {
    // Events
    event ProjectCreated(uint256 indexed projectId, address indexed owner, string name, string description);
    event Funded(uint256 indexed projectId, address indexed funder, uint256 amount);

    // Project structure
    struct Project {
        address payable owner;
        string name;
        string description;
        uint256 totalFunding;
    }

    uint256 public projectCount;
    mapping(uint256 => Project) public projects;

    /**
     * @dev Create a new project (for demo, anyone can create).
     * @param _name Project name.
     * @param _description Short description.
     */
    function createProject(string calldata _name, string calldata _description) external {
        projectCount++;
        projects[projectCount] = Project({
            owner: payable(msg.sender),
            name: _name,
            description: _description,
            totalFunding: 0
        });

        emit ProjectCreated(projectCount, msg.sender, _name, _description);
    }

    /**
     * @dev Fund an existing project with native CORE.
     * @param _projectId ID of the project to fund.
     */
    function fundProject(uint256 _projectId) external payable {
        require(_projectId > 0 && _projectId <= projectCount, "Invalid project ID");
        require(msg.value > 0, "Funding amount must be > 0");

        Project storage project = projects[_projectId];
        project.totalFunding += msg.value;

        // Transfer directly to the project owner
        (bool success, ) = project.owner.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit Funded(_projectId, msg.sender, msg.value);
    }

    /**
     * @dev Get details of a project as separate values (simpler for frontend decoding).
     */
    function getProject(uint256 _projectId)
        external
        view
        returns (address owner, string memory name, string memory description, uint256 totalFunding)
    {
        require(_projectId > 0 && _projectId <= projectCount, "Invalid project ID");
        Project storage p = projects[_projectId];
        return (p.owner, p.name, p.description, p.totalFunding);
    }
}
